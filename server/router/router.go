package router

import (
	"net/http"

	"github.com/labstack/echo/v4"
	"github.com/labstack/echo/v4/middleware"
	"github.com/leyka/Presence/server/config"
	"github.com/leyka/Presence/server/controllers"
	"github.com/leyka/Presence/server/helpers"
	"github.com/leyka/Presence/server/middlewares"
	"gorm.io/gorm"
)

var (
	g         *echo.Group
	cfg       *config.Config
	db        *gorm.DB
	jwtConfig *middleware.JWTConfig
)

func Init(echo *echo.Echo, config *config.Config, dbConn *gorm.DB) {
	g = echo.Group("/api")
	cfg = config
	db = dbConn

	// Setup JWT
	jwtConfig = &middleware.JWTConfig{
		SigningKey:              []byte(cfg.Secret),
		Claims:                  &helpers.JwtUserClaims{},
		ErrorHandlerWithContext: sendForbidden,
		TokenLookup:             "cookie:jwt",
	}

	// Register unprotected routes
	registerAuthRoutes()

	// Register protected routes
	registerClassroomsRoutes()
	registerSchoolsRoutes()
	// registerStudentsRoutes()
}

func registerAuthRoutes() {
	authController := controllers.NewAuthController(cfg, db)

	auth := g.Group("/auth")
	auth.POST("/login", authController.Login)
	auth.POST("/register", authController.Register)
	auth.GET("/csrf", authController.GetCSRF)
	auth.GET("/user", authController.GetConnectedUser, middleware.JWTWithConfig(*jwtConfig))
}

func registerSchoolsRoutes() {
	schoolsController := controllers.NewSchoolsController(cfg, db)

	schools := g.Group("/schools", middleware.JWTWithConfig(*jwtConfig))
	schools.GET("", schoolsController.All)
}

func registerClassroomsRoutes() {
	classroomsController := controllers.NewClassroomsController(cfg, db)

	classrooms := g.Group("/classrooms", middleware.JWTWithConfig(*jwtConfig))
	classrooms.GET("", classroomsController.All)
	classrooms.POST("", classroomsController.Create)
	classrooms.PUT("", classroomsController.Update)

	classroom := classrooms.Group("/:classroomId", middlewares.CheckAndGetClassroom(db))
	classroom.DELETE("", classroomsController.DeleteOne)
}

/*
func registerStudentsRoutes() {
	studentsController := controllers.NewStudentsController(cfg, db)

	// Rethink this,
	// we can re-upload student list (delete all, and re-upload), add manually a student
	// Delete one or all students
	// I don't think we need to show all students from a class because we already have it when we ask for classrooms
		students := e.Group("/students/:classroomId", middleware.JWTWithConfig(*jwtConfig), middlewares.CheckAndGetClassroom(db))
}
*/

// Send response with status 403
func sendForbidden(err error, c echo.Context) error {
	return c.JSON(http.StatusForbidden, err)
}

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
	e         *echo.Echo
	cfg       *config.Config
	db        *gorm.DB
	jwtConfig *middleware.JWTConfig
)

func Init(echo *echo.Echo, config *config.Config, dbConn *gorm.DB) {
	e = echo
	cfg = config
	db = dbConn

	// Setup JWT
	jwtConfig = &middleware.JWTConfig{
		SigningKey:              []byte(cfg.Secret),
		Claims:                  &helpers.JwtUserClaims{},
		ErrorHandlerWithContext: sendForbidden,
	}

	// Register unprotected routes
	registerAuthRoutes()

	// Register protected routes
	registerClassroomsRoutes()
	// registerStudentsRoutes()
}

func registerAuthRoutes() {
	authController := controllers.NewAuthController(cfg, db)
	e.POST("/login", authController.Login)
	e.POST("/register", authController.Register)
}

func registerClassroomsRoutes() {
	classroomsController := controllers.NewClassroomsController(cfg, db)

	classrooms := e.Group("/classrooms", middleware.JWTWithConfig(*jwtConfig))
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
	return c.NoContent(http.StatusForbidden)
}

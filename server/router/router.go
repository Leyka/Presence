package router

import (
	"net/http"

	"github.com/labstack/echo/v4"
	"github.com/labstack/echo/v4/middleware"
	"github.com/leyka/Presence/server/config"
	"github.com/leyka/Presence/server/controllers"
	"github.com/leyka/Presence/server/helpers"
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
		Claims:                  &helpers.JwtTeacherClaims{},
		ErrorHandlerWithContext: sendForbidden,
	}

	// Register unprotected routes
	registerAuthRoutes()
	// Register protected routes
	registerClassroomsRoutes()
}

func registerAuthRoutes() {
	authController := controllers.NewAuthController(cfg, db)

	e.POST("/login", authController.Login)
	e.POST("/register", authController.Register)
}

func registerClassroomsRoutes() {
	g := e.Group("/classrooms", middleware.JWTWithConfig(*jwtConfig))
	classroomsController := controllers.NewClassroomsController(cfg, db)

	g.GET("", classroomsController.All)
	g.POST("", classroomsController.Create)
	g.PUT("", classroomsController.Update)
	g.DELETE("/:id", classroomsController.DeleteOne)
}

// Send response with status 403
func sendForbidden(err error, c echo.Context) error {
	return c.NoContent(http.StatusForbidden)
}

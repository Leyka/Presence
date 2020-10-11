package router

import (
	"net/http"

	"github.com/labstack/echo/v4"
	"github.com/labstack/echo/v4/middleware"
	"github.com/leyka/Presence/server/config"
	"github.com/leyka/Presence/server/controllers"
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
		Claims:                  &controllers.JwtTeacherClaims{},
		ErrorHandlerWithContext: sendForbidden,
	}

	// Register unprotected routes
	registerAuthRoutes()
	// Register protected routes
	registerTeachersRoutes()
}

func registerAuthRoutes() {
	authController := controllers.NewAuthController(cfg, db)
	e.POST("/login", authController.Login)
	e.POST("/register", authController.Register)
}

func registerTeachersRoutes() {
	g := e.Group("/teachers", middleware.JWTWithConfig(*jwtConfig))
	g.POST("", func(c echo.Context) error {
		// todo
		return c.String(http.StatusOK, "OK")
	})
}

// Send response with status 403
func sendForbidden(err error, c echo.Context) error {
	return c.NoContent(http.StatusForbidden)
}

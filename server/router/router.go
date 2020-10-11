package router

import (
	"net/http"

	"github.com/labstack/echo/v4"
	"github.com/leyka/Presence/server/controllers"
	"gorm.io/gorm"
)

func Init(e *echo.Echo, DB *gorm.DB) {
	e.GET("/", hello)

	// Authentication
	authController := controllers.NewAuthController(DB)
	e.POST("/login", authController.Login)
	e.POST("/register", authController.Register)
}

// Handler
func hello(c echo.Context) error {
	return c.String(http.StatusOK, "Hello, World!")
}

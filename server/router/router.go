package router

import (
	"github.com/labstack/echo/v4"
	"github.com/leyka/Presence/server/config"
	"github.com/leyka/Presence/server/controllers"
	"gorm.io/gorm"
)

func Init(e *echo.Echo, config *config.Config, db *gorm.DB) {
	// Authentication
	authController := controllers.NewAuthController(config, db)
	e.POST("/login", authController.Login)
	e.POST("/register", authController.Register)
}

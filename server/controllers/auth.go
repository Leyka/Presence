package controllers

import (
	"net/http"

	"github.com/labstack/echo/v4"
	"gorm.io/gorm"
)

type Auth struct {
	DB *gorm.DB
}

func NewAuthController(db *gorm.DB) *Auth {
	return &Auth{DB: db}
}

func (a *Auth) Login(c echo.Context) error {
	return c.JSON(http.StatusOK, "Login request") // TODO
}

func (a *Auth) Register(c echo.Context) error {
	return c.JSON(http.StatusOK, "Register request") // TODO
}

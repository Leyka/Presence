package controllers

import (
	"net/http"

	"github.com/labstack/echo/v4"
	"github.com/leyka/Presence/server/config"
	"github.com/leyka/Presence/server/helpers"
	"github.com/leyka/Presence/server/models"
	"gorm.io/gorm"
)

type Auth struct {
	Config *config.Config
	DB     *gorm.DB
}

type response struct {
	User models.User `json:"user"`
}

func NewAuthController(c *config.Config, db *gorm.DB) *Auth {
	return &Auth{
		Config: c,
		DB:     db,
	}
}

func (a *Auth) Login(c echo.Context) (err error) {
	var payload models.User
	if err = c.Bind(&payload); err != nil {
		c.Logger().Error(err)
		return c.JSON(http.StatusNotAcceptable, err)
	}

	var user models.User
	// Check username
	err = a.DB.Where("username = ?", payload.Username).First(&user).Error
	if err != nil {
		c.Logger().Error(err)
		return c.NoContent(http.StatusNotFound)
	}

	// Check password
	if !user.IsMatchingPassword(payload.Password) {
		c.Logger().Error("Password doesn't match")
		return c.NoContent(http.StatusNotFound)
	}
	// Okay!
	token := helpers.CreateJwt(&user, a.Config.Secret)
	helpers.CreateJwtCookie(&c, token)
	r := &response{
		User: *user.Sanitize(),
	}

	return c.JSON(http.StatusOK, r)
}

func (a *Auth) Register(c echo.Context) (err error) {
	var user models.User
	if err = c.Bind(&user); err != nil {
		c.Logger().Error(err)
		return c.NoContent(http.StatusNotAcceptable)
	}

	// Save in DB
	if err = a.DB.Create(&user).Error; err != nil {
		panic(err)
	}

	token := helpers.CreateJwt(&user, a.Config.Secret)
	helpers.CreateJwtCookie(&c, token)
	r := &response{
		User: *user.Sanitize(),
	}

	return c.JSON(http.StatusOK, r)
}

func (a *Auth) GetCSRF(c echo.Context) error {
	csrf := c.Get("csrf")
	return c.JSON(http.StatusOK, csrf)
}

func (a *Auth) GetConnectedUser(c echo.Context) error {
	userClaims, _ := helpers.GetUserFromJwt(&c)
	var user models.User
	a.DB.First(&user, userClaims.Id)
	return c.JSON(http.StatusOK, user.Sanitize())
}

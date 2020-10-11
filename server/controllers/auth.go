package controllers

import (
	"errors"
	"net/http"

	"github.com/labstack/echo/v4"
	"github.com/leyka/Presence/server/models"
	"gorm.io/gorm"
)

type Auth struct {
	DB *gorm.DB
}

type authResponse struct {
	Teacher models.Teacher `json:"teacher"`
	Token   string         `json:"token"`
}

func NewAuthController(db *gorm.DB) *Auth {
	return &Auth{DB: db}
}

type loginPayload struct {
	Username string `json:"username"`
	Password string `json:"password"`
}

func (a *Auth) Login(c echo.Context) (err error) {
	var payload loginPayload
	if err = c.Bind(&payload); err != nil {
		c.Logger().Error(err)
		return c.JSON(http.StatusNotAcceptable, err)
	}

	var teacher models.Teacher
	// Check username
	err = a.DB.Where("username = ?", payload.Username).First(&teacher).Error
	if err != nil {
		c.Logger().Error(err)
		if errors.Is(err, gorm.ErrRecordNotFound) {
			return c.NoContent(http.StatusNotFound)
		} else {
			return c.NoContent(http.StatusInternalServerError)
		}
	}

	// Check password
	if !teacher.IsValidPassword(payload.Password) {
		return c.NoContent(http.StatusNotFound)
	}
	// Okay!
	r := &authResponse{
		Teacher: teacher,
		Token:   "", // todo
	}

	return c.JSON(http.StatusOK, r)
}

func (a *Auth) Register(c echo.Context) (err error) {
	teacher := new(models.Teacher)
	// Bind "form" tag to new Teacher model
	if err = c.Bind(&teacher); err != nil {
		c.Logger().Error(err)
		return c.NoContent(http.StatusNotAcceptable)
	}

	// Save in DB
	if a.DB.Create(teacher).Error != nil {
		c.Logger().Error(err)
		return c.NoContent(http.StatusInternalServerError)
	}

	r := &authResponse{
		Teacher: *teacher,
		Token:   "", // todo
	}

	return c.JSON(http.StatusOK, r)
}

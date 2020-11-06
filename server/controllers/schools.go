package controllers

import (
	"net/http"

	"github.com/labstack/echo/v4"
	"github.com/leyka/Presence/server/config"
	"github.com/leyka/Presence/server/helpers"
	"github.com/leyka/Presence/server/models"
	"gorm.io/gorm"
)

type Schools struct {
	Config *config.Config
	DB     *gorm.DB
}

func NewSchoolsController(c *config.Config, db *gorm.DB) *Schools {
	return &Schools{
		Config: c,
		DB:     db,
	}
}

func (s *Schools) All(c echo.Context) (err error) {
	userFromJwt, _ := helpers.GetUserFromJwt(&c)

	// Get user data and check if user admin
	var user models.User
	if s.DB.First(&user, userFromJwt.Id).Error != nil {
		return c.NoContent(http.StatusNotFound)
	}

	var schools []models.School
	if user.IsAdmin {
		s.DB.Find(&schools)
	} else {
		s.DB.Select("name").Find(&schools)
	}

	return c.JSON(http.StatusOK, schools)

}

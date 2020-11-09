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

func (s *Schools) New(c echo.Context) (err error) {
	var school models.School
	if err = c.Bind(&school); err != nil {
		panic(err)
	}

	// Save in DB
	if err = s.DB.Create(&school).Error; err != nil {
		panic(err)
	}

	return c.NoContent(http.StatusOK)
}

func (s *Schools) Edit(c echo.Context) (err error) {
	var school models.School
	if err = c.Bind(&school); err != nil {
		panic(err)
	}

	// Save in DB
	if err = s.DB.Save(&school).Error; err != nil {
		panic(err)
	}

	return c.NoContent(http.StatusOK)
}

func (s *Schools) Delete(c echo.Context) (err error) {
	schoolId := c.Param("id") // /schools/:id
	if schoolId == "" {
		return c.String(http.StatusBadRequest, "Missing 'id' in URL param")
	}

	if err = s.DB.Delete(&models.School{}, schoolId).Error; err != nil {
		panic(err)
	}

	return c.NoContent(http.StatusOK)
}

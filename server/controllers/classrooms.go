package controllers

import (
	"net/http"

	"github.com/labstack/echo/v4"
	"github.com/leyka/Presence/server/config"
	"github.com/leyka/Presence/server/helpers"
	"github.com/leyka/Presence/server/models"
	"gorm.io/gorm"
)

type Classrooms struct {
	Config *config.Config
	DB     *gorm.DB
}

func NewClassroomsController(c *config.Config, db *gorm.DB) *Classrooms {
	return &Classrooms{
		Config: c,
		DB:     db,
	}
}

func (cls *Classrooms) All(c echo.Context) (err error) {
	teacher := helpers.GetTeacherFromJwt(&c)
	var classrooms []models.Classroom
	err = cls.DB.Where("teacher_id = ?", teacher.Id).Preload("Students").Find(&classrooms).Error
	if err != nil {
		panic(err)
	}

	return c.JSON(http.StatusOK, classrooms)
}

func (cls *Classrooms) Create(c echo.Context) (err error) {
	var classroom models.Classroom
	if err = c.Bind(&classroom); err != nil {
		c.Logger().Error(err)
		return c.NoContent(http.StatusNotAcceptable)
	}

	// Assign classroom to current teacher and save classroom (with students inside)
	teacher := helpers.GetTeacherFromJwt(&c)
	classroom.TeacherID = teacher.Id
	if err = cls.DB.Create(&classroom).Error; err != nil {
		panic(err)
	}

	return c.JSON(http.StatusOK, classroom)
}

func (cls *Classrooms) Update(c echo.Context) (err error) {
	var classroomPayload models.Classroom
	if err = c.Bind(&classroomPayload); err != nil {
		c.Logger().Error(err)
		return c.NoContent(http.StatusNotAcceptable)
	}

	var classroom models.Classroom
	if err = cls.DB.Select("teacher_id").First(&classroom, classroomPayload.ID).Error; err != nil {
		return c.NoContent(http.StatusNotFound)
	}

	// Check if classroom belongs to teacher
	teacher := helpers.GetTeacherFromJwt(&c)
	if teacher.Id != classroom.TeacherID {
		return c.NoContent(http.StatusForbidden)
	}

	// Make sure to assign or re-assign the current teacher Id
	classroomPayload.TeacherID = teacher.Id

	if err = cls.DB.Save(&classroomPayload).Error; err != nil {
		panic(err)
	}

	return c.JSON(http.StatusOK, classroomPayload)
}

func (cls *Classrooms) DeleteOne(c echo.Context) (err error) {
	classroomId := c.Param("id")
	var classroom models.Classroom
	if err = cls.DB.First(&classroom, classroomId).Error; err != nil {
		return c.NoContent(http.StatusNotFound)
	}

	// Check if classroomId belongs to current teacher
	teacher := helpers.GetTeacherFromJwt(&c)
	if teacher.Id != classroom.TeacherID {
		return c.NoContent(http.StatusForbidden)
	}
	// Permanent delete
	if err = cls.DB.Unscoped().Delete(&classroom).Error; err != nil {
		panic(err)
	}

	return c.NoContent(http.StatusOK)
}

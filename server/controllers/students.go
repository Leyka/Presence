package controllers

import (
	"github.com/leyka/Presence/server/config"
	"github.com/leyka/Presence/server/models"
	"gorm.io/gorm"
)

type Students struct {
	Config *config.Config
	DB     *gorm.DB
}

type studentsPayload struct {
	ClassroomId uint             `json:"classroomId"`
	Students    []models.Student `json:"students"`
}

func NewStudentsController(c *config.Config, db *gorm.DB) *Students {
	return &Students{
		Config: c,
		DB:     db,
	}
}

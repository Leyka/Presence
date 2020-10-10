package models

import (
	"time"

	"gorm.io/gorm"
)

type Classroom struct {
	gorm.Model
	Name      string
	Group     uint8
	TimeStart time.Time
	TimeEnd   time.Time
	Students  []Student
	TeacherID uint
}

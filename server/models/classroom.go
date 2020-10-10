package models

import (
	"time"

	"github.com/google/uuid"
	"gorm.io/gorm"
)

type Classroom struct {
	gorm.Model `json:"-"`
	UUID       uuid.UUID `json:"id" gorm:"type:uuid;default:uuid_generate_v4()"`
	Name       string    `json:"name"`
	Group      uint8     `json:"group"`
	TimeStart  time.Time `json:"timeStart"`
	TimeEnd    time.Time `json:"timeEnd"`
	Students   []Student `json:"students"`
	TeacherID  uint      `json:"-"`
}

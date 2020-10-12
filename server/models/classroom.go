package models

import (
	"time"
)

type Classroom struct {
	BaseModel
	Name      string    `json:"name"`
	Group     uint8     `json:"group"`
	TimeStart time.Time `json:"timeStart"`
	TimeEnd   time.Time `json:"timeEnd"`
	Students  []Student `json:"students" gorm:"constraint:OnUpdate:CASCADE,OnDelete:CASCADE;"`
	TeacherID uint      `json:"-"`
}

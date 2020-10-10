package models

import (
	"github.com/google/uuid"
	"gorm.io/gorm"
)

type Student struct {
	gorm.Model  `json:"-"`
	UUID        uuid.UUID `json:"id" gorm:"type:uuid;default:uuid_generate_v4()"`
	FirstName   string    `json:"firstName" gorm:"index:idx_fullname_student"`
	LastName    string    `json:"lastName" gorm:"index:idx_fullname_student"`
	ClassroomID uint      `json:"-"`
}

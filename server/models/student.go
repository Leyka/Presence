package models

import "gorm.io/gorm"

type Student struct {
	gorm.Model
	FirstName   string `gorm:"index:idx_fullname_student"`
	LastName    string `gorm:"index:idx_fullname_student"`
	ClassroomID uint
}

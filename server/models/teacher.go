package models

import "gorm.io/gorm"

type Teacher struct {
	gorm.Model
	Username   string `gorm:"unique_index"`
	Password   string
	FirstName  string `gorm:"index:idx_fullname_teacher"`
	LastName   string `gorm:"index:idx_fullname_teacher"`
	Classrooms []Classroom
}

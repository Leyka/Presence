package models

import "gorm.io/gorm"

type Teacher struct {
	gorm.Model
	Username  string `gorm:"unique_index"`
	Password  string
	FirstName string `gorm:"index:idx_fullname"`
	LastName  string `gorm:"index:idx_fullname"`
}

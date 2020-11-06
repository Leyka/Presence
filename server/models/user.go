package models

import (
	"golang.org/x/crypto/bcrypt"
	"gorm.io/gorm"
)

type User struct {
	BaseModel
	Username   string      `json:"username" gorm:"uniqueIndex"`
	Password   string      `json:"password,omitempty"`
	FirstName  string      `json:"firstName" gorm:"index:idx_fullname_user"`
	LastName   string      `json:"lastName" gorm:"index:idx_fullname_user"`
	Classrooms []Classroom `json:"classrooms"`
	IsAdmin    bool        `json:"isAdmin" gorm:"default:false;not null"`
	SchoolID   string      `json:"-"`
}

func (u *User) BeforeSave(tx *gorm.DB) error {
	hash, err := bcrypt.GenerateFromPassword([]byte(u.Password), bcrypt.DefaultCost)
	if err == nil {
		u.Password = string(hash)
	}
	return err
}

func (u *User) IsMatchingPassword(candidatePass string) bool {
	err := bcrypt.CompareHashAndPassword([]byte(u.Password), []byte(candidatePass))
	return err == nil
}

// Returns a safe user by removing sensitive data such as password
func (u *User) Sanitize() *User {
	u.Password = ""
	return u
}

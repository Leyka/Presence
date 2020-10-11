package models

import (
	"golang.org/x/crypto/bcrypt"
	"gorm.io/gorm"
)

type Teacher struct {
	BaseModel
	Username   string      `json:"username" gorm:"uniqueIndex"`
	Password   string      `json:"password,omitempty"`
	FirstName  string      `json:"firstName" gorm:"index:idx_fullname_teacher"`
	LastName   string      `json:"lastName" gorm:"index:idx_fullname_teacher"`
	Classrooms []Classroom `json:"classrooms"`
}

func (t *Teacher) BeforeSave(tx *gorm.DB) error {
	hash, err := bcrypt.GenerateFromPassword([]byte(t.Password), bcrypt.DefaultCost)
	if err == nil {
		t.Password = string(hash)
	}
	return err
}

func (t *Teacher) IsMatchingPassword(candidatePass string) bool {
	err := bcrypt.CompareHashAndPassword([]byte(t.Password), []byte(candidatePass))
	return err == nil
}

// Returns a safe teacher by removing sensitive data such as password
func (t *Teacher) Sanitize() *Teacher {
	t.Password = ""
	return t
}

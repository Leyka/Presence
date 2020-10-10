package models

import (
	"github.com/google/uuid"
	"golang.org/x/crypto/bcrypt"
	"gorm.io/gorm"
)

type Teacher struct {
	gorm.Model `json:"-"`
	UUID       uuid.UUID   `json:"id" gorm:"type:uuid;default:uuid_generate_v4()"`
	Username   string      `json:"username" gorm:"unique_index"`
	Password   string      `json:"-"`
	FirstName  string      `json:"firstName" gorm:"index:idx_fullname_teacher"`
	LastName   string      `json:"lastName" gorm:"index:idx_fullname_teacher"`
	Classrooms []Classroom `json:"classrooms"`
}

func (t *Teacher) BeforeSave(tx *gorm.DB) error {
	bytes, err := bcrypt.GenerateFromPassword([]byte(t.Password), 10)
	if err == nil {
		t.Password = string(bytes)
	}
	return err
}

func (t *Teacher) IsValidPassword(candidatePass string) bool {
	err := bcrypt.CompareHashAndPassword([]byte(t.Password), []byte(candidatePass))
	return err == nil
}

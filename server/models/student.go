package models

type Student struct {
	BaseModel
	FirstName   string `json:"firstName" gorm:"uniqueIndex:idx_unique_student"`
	LastName    string `json:"lastName" gorm:"uniqueIndex:idx_unique_student"`
	ClassroomID string `json:"-" gorm:"uniqueIndex:idx_unique_student"`
}

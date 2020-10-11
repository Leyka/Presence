package models

type Student struct {
	BaseModel
	FirstName   string `json:"firstName" gorm:"index:idx_fullname_student"`
	LastName    string `json:"lastName" gorm:"index:idx_fullname_student"`
	ClassroomID uint   `json:"-"`
}

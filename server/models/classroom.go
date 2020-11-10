package models

type Classroom struct {
	BaseModel
	Name      string     `json:"name"`
	Group     uint8      `json:"group"`
	Students  []Student  `json:"students" gorm:"constraint:OnDelete:CASCADE;"`
	Schedules []Schedule `json:"schedules" gorm:"constraint:OnDelete:CASCADE;"`
	UserID    uint       `json:"-"`
}

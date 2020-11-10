package models

import "time"

type Schedule struct {
	BaseModel
	TimeStart   time.Time `json:"timeStart"`
	TimeEnd     time.Time `json:"timeEnd"`
	ClassroomID uint
}

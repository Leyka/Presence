package models

type School struct {
	BaseModel
	Name                       string `json:"name"`
	StudentFirstNamePosition   uint8  `json:"studentFirstNamePosition,omitempty"`
	StudentLastNamePosition    uint8  `json:"studentLastNamePosition,omitempty"`
	ClassNameGroupRegexPattern string `json:"classNameGroupRegexPattern,omitempty"`
	Teachers                   []User `json:"teachers,omitempty"`
}

// Returns a basic School structure when user is not admin
func (s *School) Sanitize() *School {
	s.StudentFirstNamePosition = 0
	s.StudentLastNamePosition = 0
	s.ClassNameGroupRegexPattern = ""
	s.Teachers = nil
	return s
}

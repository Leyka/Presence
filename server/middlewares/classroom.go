package middlewares

import (
	"net/http"

	"github.com/labstack/echo/v4"
	"github.com/leyka/Presence/server/helpers"
	"github.com/leyka/Presence/server/models"
	"gorm.io/gorm"
)

// Checks that classroom belongs to current teacher. If so, pass the classroom data in echo Context, otherwise return HTTP errors.
// Err 400: if no :classroomId parameter passed to request
// Err 404: if classroomId not found
// Err 403: if classroom doesn't belong to current teacher
func CheckAndGetClassroom(db *gorm.DB) echo.MiddlewareFunc {
	return func(next echo.HandlerFunc) echo.HandlerFunc {
		return func(c echo.Context) error {
			// Param check
			classroomId := c.Param("classroomId")
			if classroomId == "" {
				return c.NoContent(http.StatusBadRequest)
			}

			// Get classroom data
			var classroom models.Classroom
			if db.Preload("Students").First(&classroom, classroomId).Error != nil {
				return c.NoContent(http.StatusNotFound)
			}

			// Get current teacher
			teacher := helpers.GetTeacherFromJwt(&c)

			// Check if classroom belongs to teacher
			if teacher.Id != classroom.TeacherID {
				return c.NoContent(http.StatusForbidden)
			}

			// Pass classroom data to not recall db again for the next action (same context)
			c.Set("classroom", &classroom)
			return next(c)
		}
	}
}

package middlewares

import (
	"net/http"

	"github.com/leyka/Presence/server/models"

	"github.com/labstack/echo/v4"
	"github.com/leyka/Presence/server/helpers"
	"gorm.io/gorm"
)

// Check if user had admin rights
// Err 400: if no jwt was passed
// Err 404: if user doesn't exist
// Err 403: if user is not admin
func CheckIfUserAdmin(db *gorm.DB) echo.MiddlewareFunc {
	return func(next echo.HandlerFunc) echo.HandlerFunc {
		return func(c echo.Context) error {
			// Get current user
			userFromJwt, _ := helpers.GetUserFromJwt(&c)

			// Check if we have a user
			if userFromJwt == nil {
				return c.NoContent(http.StatusBadRequest)
			}

			// Get user data and check if user admin
			var user models.User
			if db.First(&user, userFromJwt.Id).Error != nil {
				return c.NoContent(http.StatusNotFound)
			}

			if !user.IsAdmin {
				return c.NoContent(http.StatusForbidden)
			}

			return next(c)
		}
	}
}

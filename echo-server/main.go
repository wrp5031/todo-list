package main

import (
	"net/http"

	"github.com/google/uuid"
	"github.com/labstack/echo"
	"github.com/labstack/echo/middleware"
)

type (
	todo struct {
		ID        string `json:"id"`
		Content   string `json:"content"`
		Completed bool   `json:"completed"`
	}
)

var todoList = map[string]*todo{}

func createTodo(c echo.Context) error {
	id := uuid.New()
	u := &todo{
		ID: id.String(),
	}
	if err := c.Bind(u); err != nil {
		return err
	}
	todoList[u.ID] = u
	return c.JSON(http.StatusCreated, u)
}

func getTodoList(c echo.Context) error {
	return c.JSON(http.StatusOK, todoList)
}

func updateTodo(c echo.Context) error {
	u := new(todo)
	if err := c.Bind(u); err != nil {
		return err
	}
	todoList[c.Param("id")].Content = u.Content
	todoList[c.Param("id")].Completed = u.Completed
	return c.JSON(http.StatusOK, todoList[c.Param("id")])
}

func deleteTodo(c echo.Context) error {
	delete(todoList, c.Param("id"))
	return c.NoContent(http.StatusNoContent)
}

func main() {
	e := echo.New()

	// Middleware
	e.Use(middleware.Logger())
	e.Use(middleware.Recover())
	e.Use(middleware.CORS())

	// Routes
	e.POST("/todos", createTodo)
	e.GET("/todos", getTodoList)
	e.PUT("/todos/:id", updateTodo)
	e.DELETE("/todos/:id", deleteTodo)

	// Start server
	e.Logger.Fatal(e.Start(":1323"))
}

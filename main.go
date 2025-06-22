package main

import (
	"fmt"
	"log"
	"strconv"

	"github.com/gofiber/fiber/v2"
)

type Todo struct {
    ID   int `json:"id"`
	Completed bool `json:"completed"`
    Body string `json:"body"`
}

func main() {
	fmt.Println("Hello, World!")

	app	:= fiber.New()

	todos := []Todo{}

	app.Get("/", func(c *fiber.Ctx) error {
		return c.Status(200).JSON(fiber.Map{"message": "Hello, World! 2" })
	})
	
	// Create a Todo
	app.Post("/api/todos", func(c *fiber.Ctx) error {
		todo:= &Todo{}

		if err := c.BodyParser(todo); err != nil {
			return c.Status(400).JSON(fiber.Map{"error": "Invalid request body"})
		}

		if todo.Body == "" {
			return c.Status(400).JSON(fiber.Map{"error": "Todo body cannot be empty"})
		}

		todo.ID = len(todos) + 1
		todos = append(todos, *todo)
		
		return c.Status(201).JSON(fiber.Map{"message": "Todo created successfully", "todo": todo})
	})

	// Update a Todo
	app.Patch("/api/todos/:id", func(c *fiber.Ctx) error {

		id:= c.Params("id")
		if id == "" {
			return c.Status(400).JSON(fiber.Map{"error": "Todo ID is required"})
		}

		for i, todo := range todos {
			if strconv.Itoa(todo.ID) == id {
				todos[i].Completed = true
				return c.Status(200).JSON(fiber.Map{"message": "Todo updated successfully", "todo": todos[i]})
			}
		}
		return c.Status(404).JSON(fiber.Map{"error": "Todo not found"})
	})


	log.Fatal(app.Listen(":4000"))
}

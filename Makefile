.PHONY: help doctor doctor-python doctor-typescript setup setup-python setup-typescript

help: ## Show available targets
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | \
		awk 'BEGIN {FS = ":.*?## "}; {printf "  %-20s %s\n", $$1, $$2}'

doctor: ## Check all tools
	@./bin/doctor

doctor-python: ## Check tools for the Python path
	@./bin/doctor python

doctor-typescript: ## Check tools for the TypeScript path
	@./bin/doctor typescript

setup: doctor ## Install all dependencies
	@echo "Installing Python backend dependencies…"
	@cd backend/python && uv sync
	@echo "Installing TypeScript backend dependencies…"
	@cd backend/typescript && bun install
	@echo "Installing frontend dependencies…"
	@cd frontend && npm install

setup-python: doctor-python ## Install Python backend + frontend dependencies
	@echo "Installing Python backend dependencies…"
	@cd backend/python && uv sync
	@echo "Installing frontend dependencies…"
	@cd frontend && npm install

setup-typescript: doctor-typescript ## Install TypeScript backend + frontend dependencies
	@echo "Installing TypeScript backend dependencies…"
	@cd backend/typescript && bun install
	@echo "Installing frontend dependencies…"
	@cd frontend && npm install

build:
	@echo "==> Building Docker image"
	docker build -t emochan-browser-shot .
.PHONY: build

test:
	@echo "==> Generate image snapshot via npm test"
	docker run --rm -v $(PWD)/test:/app/test emochan-browser-shot
.PHONY: test

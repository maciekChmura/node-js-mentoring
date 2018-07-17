## HOMEWORK 8
### SWAGGER. DOCS

#### Tasks

1. Navigate to SwaggerHub and create your personal account here.
2. Create new API with OpenAPI version 2.0.
3. Create API documentation for all implemented routes from prerequisites. Make sure that your documentation contains following information:

    * name and description for every tag;
name, description, example value and model for every parameter;
    * all required parameter should be marked appropriately;
    * code and description for all possible responses;
    * definitions of all used models with refs set to them.

4. Export (download) your API as YAML file.
5. Install swagger package.
6. Create a new project based on the exported YAML file using swagger CLI.
7. Edit your YAML using built in Swagger Editor so that your paths could use appropriate controllers for handling particular routes.
8. Implement routes handling logic from Homework 7 in the corresponding controllers (all data should be returned from the database). 
9. Run the project server and make sure that your API responds on all implemented endpoints.

#### Evaluation Criteria
1. Account and new API were created (tasks 1-2).
2. API documentation partially covers some of required routes or contains not all required information (tasks 3).
3. API documentation covers all required routes with all required information described, API was successfully exported as YAML file (task 3-4).
4. Swagger was installed, project was created (tasks 5-7).
5. Project server responds on all required endpoints and returns data from the database (task 8-9).

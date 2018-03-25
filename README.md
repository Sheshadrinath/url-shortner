# url-shortner

The goal of this tool is to provide the URL shortner service when hosted. User can configure the short url against the full URL in the mapping.json file. When request is received against the key, then the application will redirect the request to the configured webiste.

# Roadmap
Currently this application uses the static mapping. In the next phase, support will be added by providing the user interface where user can create more mappings. This will avoid user to manipulate the JSON mapping file manually. We are also thinking to provide support to fetch the mappings from cache server too if configured.
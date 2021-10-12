# FROM nginx

# EXPOSE 80

# RUN rm /usr/share/nginx/html/*

# COPY  default.conf /etc/nginx/conf.d/default.conf

# CMD [ "nginx", "-g", "daemon off;" ]


# FROM nginx:1.16.0-alpine
# RUN rm /etc/nginx/conf.d/default.conf
# COPY default.conf /etc/nginx/nginx.conf
# EXPOSE 80
# CMD ["nginx", "-g", "daemon off;"]


# Base on offical NGINX Alpine image
# FROM nginx:alpine

# # Remove any existing config files
# RUN rm /etc/nginx/conf.d/*

# # Copy config files
# # *.conf files in conf.d/ dir get included in main config
# COPY ./default.conf /etc/nginx/conf.d/

# # Expose the listening port
# EXPOSE 80

# # Launch NGINX
# CMD [ "nginx", "-g", "daemon off;" ]


# FROM nginx
# COPY default.conf /etc/nginx/nginx.conf



# FROM nginx
# COPY ./default.conf /etc/nginx/conf.d/default.conf
# EXPOSE 80



FROM nginx

COPY nginx.conf /etc/nginx/nginx.conf
COPY nginx.conf /etc/nginx/nginx-raw.conf

RUN rm /etc/nginx/conf.d/default.conf || true
COPY nginx.conf /etc/nginx/conf.d
# COPY html /usr/share/nginx/html
EXPOSE 80
EXPOSE 443
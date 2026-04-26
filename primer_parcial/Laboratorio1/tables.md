libro - autor
libro - id - titulo - isbn - autor-id (fk) - anio_publicacion - edicion

    autor:
        - id
        - nombres
        - apellido
        - fecha_nacimiento
        - nacionalidad
        - correo_electronico

docker run --name MySQLContainer \
-e MYSQL_ROOT_PASSWORD=admin \
-e MYSQL_DATABASE=library \
-e MYSQL_USER=admin \
-e MYSQL_PASSWORD=admin \
-p 3306:3306 \
-d mysql:latest

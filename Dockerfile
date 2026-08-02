# Sử dụng OpenJDK làm môi trường chạy
FROM eclipse-temurin:17-jdk-alpine
WORKDIR /app
# Copy file jar được build vào container
COPY target/*.jar app.jar
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar"]
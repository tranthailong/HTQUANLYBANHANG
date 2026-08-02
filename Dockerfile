# --- GIAI ĐOẠN 1: BUILD FILE JAR BẰNG MAVEN ---
FROM maven:3.9.9-eclipse-temurin-21 AS build

WORKDIR /app

COPY pom.xml .
COPY src ./src

RUN mvn clean package -DskipTests


# --- GIAI ĐOẠN 2: CHẠY ỨNG DỤNG ---
FROM eclipse-temurin:21-jre-jammy

WORKDIR /app

# Copy file JAR từ giai đoạn build sang
COPY --from=build /app/target/*.jar app.jar

# Port Spring Boot
EXPOSE 6699

ENTRYPOINT ["java", "-jar", "app.jar"]
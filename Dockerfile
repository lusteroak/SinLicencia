FROM ubuntu:latest

FROM maven:3.9.16 AS BUILD
WORKDIR /app
COPY SinLicenciaBackend /app
RUN mvn clean package

FROM openjdk:17.0.1-jdk-slim
WORKDIR /app
COPY --from=BUILD /app/target/SinLicencia-0.0.1-SNAPSHOT.jar SinLicencia.jar
EXPOSE 9876
ENTRYPOINT ["java", "-jar", "SinLicencia"]
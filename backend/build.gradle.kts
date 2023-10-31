plugins {
	java
	id("org.springframework.boot") version "3.1.5"
	id("io.spring.dependency-management") version "1.1.3"
}

group = "com.addShot"
version = "0.0.1-SNAPSHOT"

java {
	sourceCompatibility = JavaVersion.VERSION_17
}

configurations {
	compileOnly {
		extendsFrom(configurations.annotationProcessor.get())
	}
}

repositories {
	mavenCentral()
}

dependencies {
	implementation("org.springframework.boot:spring-boot-starter-data-jpa")
//	implementation("org.springframework.boot:spring-boot-starter-oauth2-client")
	implementation("org.springframework.boot:spring-boot-starter-security")
	implementation("org.springframework.boot:spring-boot-starter-web")
    compileOnly("org.projectlombok:lombok")
	runtimeOnly("org.mariadb.jdbc:mariadb-java-client")
	annotationProcessor("org.projectlombok:lombok")
	testImplementation("org.springframework.boot:spring-boot-starter-test")
	//testImplementation("org.springframework.security:spring-security-test")

	// Redis
	implementation ("org.springframework.boot:spring-boot-starter-data-redis")

	// Querydsl
	implementation("com.querydsl:querydsl-jpa:5.0.0:jakarta")
	annotationProcessor("com.querydsl:querydsl-apt:${dependencyManagement.importedProperties["querydsl.version"]}:jakarta")
	annotationProcessor("jakarta.annotation:jakarta.annotation-api")
	annotationProcessor("jakarta.persistence:jakarta.persistence-api")

	// p6spy - SQL Check
	implementation("com.github.gavlyukovskiy:p6spy-spring-boot-starter:1.9.0")

	//Swagger
	implementation("org.springdoc:springdoc-openapi-starter-webmvc-ui:2.0.2")


	//jwt
	implementation ("io.jsonwebtoken:jjwt-api:0.11.5")
	implementation ("io.jsonwebtoken:jjwt-impl:0.11.5")
	implementation ("io.jsonwebtoken:jjwt-jackson:0.11.5")

}

tasks.withType<Test> {
	useJUnitPlatform()
}

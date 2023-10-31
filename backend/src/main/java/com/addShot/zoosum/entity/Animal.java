package com.addShot.zoosum.entity;

import com.addShot.zoosum.domain.animal.dto.response.AnimalDrawResponse;
import com.addShot.zoosum.entity.enums.MotionCategory;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter @Setter
@Builder
@Table(name = "animal")
@NoArgsConstructor
@AllArgsConstructor
public class Animal {

	@Id @GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "animal_id")
	private Long animalId;

	@Column(name = "animal_name", length = 20, nullable = false)
	private String animalName;

	@Column(nullable = false)
	private String description;

	@Column(name = "file_url", nullable = false)
	private String defaultFileUrl;

	@Enumerated(EnumType.STRING)
	@Column(name = "motion_category", length = 10, nullable = false, columnDefinition = "VARCHAR(10)")
	private MotionCategory motionCategory;

	public AnimalDrawResponse toResponseDto(Animal animal) {
		return AnimalDrawResponse.builder()
			.animalId(animal.getAnimalId())
			.animalName(animal.getAnimalName())
			.description(animal.getDescription())
			.fileUrl(animal.getDefaultFileUrl())
			.build();
	}

	@Override
	public String toString() {
		return "Animal{" +
			"animalId=" + animalId +
			", animalName='" + animalName + '\'' +
			", description='" + description + '\'' +
			", defaultFileUrl='" + defaultFileUrl + '\'' +
			", motionCategory=" + motionCategory +
			'}';
	}
}

package com.addShot.zoosum.entity;

import com.addShot.zoosum.domain.animal.dto.response.AnimalDrawResponse;
import com.addShot.zoosum.entity.enums.MotionCategory;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter @Setter
@Table(name = "animal_motion")
@NoArgsConstructor
@AllArgsConstructor
public class AnimalMotion {

	@Id @GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "animal_motion_id")
	private Long animalMotionId;

	@Enumerated(EnumType.STRING)
	@Column(name = "motion_category", length = 20, nullable = false)
	private MotionCategory motionCategory;

	@Column(name = "file_url", nullable = false)
	private String fileUrl;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "animal_id")
	private Animal animal; //단방향

	public AnimalDrawResponse toResponseDto() {
		return AnimalDrawResponse.builder()
			.animalId(this.getAnimal().getAnimalId())
			.animalName(this.getAnimal().getAnimalName())
			.description(this.getAnimal().getDescription())
			.fileUrl(this.getFileUrl())
			.build();
	}

}

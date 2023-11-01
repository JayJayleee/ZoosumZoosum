package com.addShot.zoosum.entity;

import com.addShot.zoosum.entity.embedded.Time;
import com.addShot.zoosum.entity.embedded.UserAnimalId;
import jakarta.persistence.Column;
import jakarta.persistence.Embedded;
import jakarta.persistence.EmbeddedId;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.MapsId;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter @Setter @Builder
@Table(name = "user_animal")
@NoArgsConstructor
@AllArgsConstructor
public class UserAnimal {

	@EmbeddedId
	private UserAnimalId id;

	@ManyToOne(fetch = FetchType.LAZY)
	@MapsId("userId")
	@JoinColumn(name = "user_id")
	private User user;

	@ManyToOne(fetch = FetchType.LAZY)
	@MapsId("animalId")
	@JoinColumn(name = "animal_id")
	private Animal animal;

	@Column(nullable = false, columnDefinition = "TINYINT(1) default 0")
	private boolean selected;

	@Column(name = "user_animal_name", nullable = false, length = 20)
	private String userAnimalName;

	@Column(name = "time_together", nullable = false, columnDefinition = "int DEFAULT 0")
	private int timeTogether;

	@Column(name = "trash_together", nullable = false, columnDefinition = "int DEFAULT 0")
	private int trashTogether;

	@Column(name = "length_together", nullable = false, columnDefinition = "int DEFAULT 0")
	private int lengthTogether;

	@Embedded
	private Time time;

}

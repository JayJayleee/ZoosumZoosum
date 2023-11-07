package com.addShot.zoosum.util;

import java.awt.Color;
import java.awt.Font;
import java.awt.Graphics2D;
import java.awt.GraphicsEnvironment;
import java.awt.image.BufferedImage;
import java.io.File;
import java.time.LocalDate;
import javax.imageio.ImageIO;

public class TreeImageTest {

	public static void main(String[] args) {
		try {
			//이미지 파일 가져오기
//			File originalImageFile = new File("C:\\Users\\SSAFY\\free_project\\certificate.png");
			File originalImageFile = new File(
				TreeImageTest.class.getResource("/certificate.png").toURI());
			BufferedImage image = ImageIO.read(originalImageFile);

			//이미지 위에 그릴 Graphics2D 객체 가져오기
			Graphics2D g2d = image.createGraphics();

			//텍스트 속성 설정
//			Font font = new Font("하늘보리체 TTF", Font.PLAIN, 55);
//			g2d.setFont(font);
//			g2d.setColor(Color.BLACK);

			//폰트 파일을 로드합니다.
			String fontFilePath = "C:\\Users\\SSAFY\\free_project\\S09P31B102\\backend\\src\\main\\resources\\SKYBORI.ttf";
			Font customFont =  Font.createFont(Font.TRUETYPE_FONT, new File(fontFilePath)).deriveFont(55f);

			String fontFilePath2 = "C:\\Users\\SSAFY\\free_project\\S09P31B102\\backend\\src\\main\\resources\\SOYO Maple Bold.ttf";
			Font customFont2 =  Font.createFont(Font.TRUETYPE_FONT, new File(fontFilePath2)).deriveFont(60f);

			//로드한 폰트를 시스템 폰트로 등록
			GraphicsEnvironment ge = GraphicsEnvironment.getLocalGraphicsEnvironment();
			ge.registerFont(customFont);

			g2d.setFont(customFont);
			g2d.setColor(Color.BLACK);

			//받은 데이터로 텍스트 그리기
			//1) 이름
			String name = "이웅성";
			g2d.drawString(name, 650, 895); //위치 지정
//			image.getHeight()-50
			//2) 나무이름
			String treeName = "아낌없이 주는 나무";
			g2d.drawString(treeName, 650, 1045);
			//3) 전화번호
			String phone = "010-1234-5678";
			//전화번호 뒷자리 *로 변경하는 코드 추가
			phone = phone.replace(phone.substring(9, phone.length()), "****");
			g2d.drawString(phone, 650, 1200);
			//4) 생년월일
			String birth = "1999.09.16";
			g2d.drawString(birth, 650, 1375);

			//날짜용 폰트로 다시 지정
			g2d.setFont(customFont2);
			g2d.setColor(Color.BLACK);

			//5) 오늘날짜
			LocalDate today = LocalDate.now();
			int year = today.getYear();
			int month = today.getMonth().getValue();
			int day = today.getDayOfMonth();
			String todayDate = year + "년 "  + month + "월 " + day + "일";
			g2d.drawString(todayDate, 440, 1550);

			//Graphics2D 리소스 해제
			g2d.dispose();

			//새 이미지 파일로 저장
			File newImageFile = new File("C:\\Users\\SSAFY\\free_project\\tree.png");
			ImageIO.write(image, "png", newImageFile);
			System.out.println("이미지가 생성되었습니다.");

			//시스템에 등록되어 있는 폰트 확인
//			GraphicsEnvironment env = GraphicsEnvironment.getLocalGraphicsEnvironment();
//			String[] fontNames = env.getAvailableFontFamilyNames();
//			for (String fontName : fontNames) {
//				System.out.println(fontName);
//			}

		}
		catch (Exception e) {
			e.printStackTrace();
		}
	}

}

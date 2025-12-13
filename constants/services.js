export const mockServices = [
	{ id: '1', name: 'Massage', providerId: 'M001', icon: 'body-outline' },
	{ id: '2', name: 'Cryo Therapy', providerId: 'C001', icon: 'snow-outline' },
	{ id: '3', name: 'IR Sauna', providerId: 'I001', icon: 'flame-outline' },
]

export const mockServicesCarousel = [
	{
		id: '1',
		name: 'Sports Massage',
		image: require('@/assets/massage.jpeg'),
		description: {
			whatIs:
				'A technique used for injury prevention, physical preparation for athletic activity and recovery from workouts and injuries. It was developed to prepare muscle systems for specific sports and help athletes-in-training before, during and after sporting events.',
			benefits:
				'This technique can aid in several benefits, including decreased muscle tension and enhancing your overall athletic performance by targeting your muscles. Different combos of different massage techniques can also improve different physiological variables; for example, combining the Effleurage, Petrissage and Vibration techniques can help promote better blood flow, among other things. And of course, this massage will be administered by none other than our experienced Recovery Specialists!',
			howItWorks: {
				intro:
					'The sports massage is a collection of massage techniques specifically designed to aid in recovery. It is a manual form of therapy that involves the application of pressure to work out any affected muscles or joints.',
				techniques: [
					{ name: 'Effleurage', description: 'a gliding motion that warms tissue and promotes local circulation.' },
					{ name: 'Petrissage', description: 'kneading technique to loosen muscle spasms and reduce swelling.' },
					{ name: 'Tapotement', description: 'a striking motion that stimulates the muscle tissue.' },
					{
						name: 'Friction',
						description: 'short, deep strokes that breaks up scar tissue and triggers local inflammation responses.',
					},
					{ name: 'Vibration', description: 'relaxes the muscles and promotes local circulation.' },
				],
			},
			recommendedFor: [
				'Active people and professional athletes',
				'People with areas prone to injury',
				'People with problem areas during workout',
			],
		},
	},
	{
		id: '2',
		name: 'Assisted Stretching',
		image: require('@/assets/Assisted.jpeg'),
		description: {
			howItWorks:
				"Assisted stretching is a technique where a trained professional (like a therapist or coach) helps you stretch your muscles, often pushing your body deeper into the stretch than you could do safely on your own. It's commonly used to improve flexibility, reduce muscle tightness, and enhance recovery.",
			benefits:
				'Assisted stretching benefits you by improving flexibility, relieving muscle tension, enhancing posture, and increasing joint mobility. It promotes better circulation, reduces the risk of injuries and speeds up recovery.',
			whenToDo:
				'Assisted stretching is ideal when you feel stiff, have limited flexibility, or experience muscle tension from prolonged sitting, standing, or physical activity.',
			recommendedFor: [
				'Improves flexibility and mobility.',
				'Relieves tightness and tension.',
				'Enhances recovery after workouts.',
				'Helps prevent pain or injury.',
			],
		},
	},
	{
		id: '3',
		name: 'Floatation Therapy',
		image: require('@/assets/Floatation.jpeg'),
		description: {
			whatIs:
				'Floatation therapy is a treatment utilizing a sensory restriction chamber filled with Epsom salt-infused water. The experience is calibrated to eliminate all sensory distraction and enable a stress-free environment.',
			howItWorks:
				'Our float chamber is provided by Float Lab, the only company in the world certified for commercial use. It is a sound and light-proof environment that minimizes sensory signals; without any external information to process, the mind is redirected. The chamber is filled with 10 inches of water, infused with 1,000 pounds of Epsom salt to create more buoyancy. This simulates a zero-gravity experience while floating, limiting the gravitational pulls on the musculoskeletal system.',
			benefits:
				'Floatation therapy considers environmental factors of stress, not just from workouts, but also from daily life. By removing anxiety stimuli, it benefits the brain by lowering blood pressure, relaxing the nervous system, and decreasing stress hormones. It provides numerous mind and body benefits, including better sleep patterns, improved recovery times, and minimized effects of stress-related conditions like hypertension and tension headaches. The buoyancy in floatation therapy facilitates easier blood flow, helping to remove lactic acid build-up from muscles and minimize muscle stiffness. Stress has damaging effects on our physical and mental well-being. For fitness, recovery times are contingent on your stress levels.',
			recommendedFor: [
				'Active people',
				'Lowering the risk of injury during exercise',
				'Performance enhancement',
				'Lowering stress and anxiety levels',
			],
		},
	},
	{
		id: '4',
		name: 'Cryotherapy',
		image: 'https://images.unsplash.com/photo-1607619056574-7b8d3ee536b2?w=400&h=300&fit=crop',
		description: '',
	},
	{
		id: '5',
		name: 'Infrared Sauna',
		image: 'https://images.unsplash.com/photo-1600334129128-685c5582fd35?w=400&h=300&fit=crop',
		description: '',
	},
]

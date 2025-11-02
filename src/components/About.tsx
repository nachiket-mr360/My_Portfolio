import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Mail, Phone, MapPin } from 'lucide-react';
import aboutData from '../data/about.json';

const About = () => {
	const ref = useRef<HTMLDivElement | null>(null);
	const isInView = useInView(ref, { once: false, margin: '-100px', amount: 0.15 });

		const fadeInUp = {
			initial: { opacity: 0.35, y: 28 },
			animate: { opacity: 1, y: 0 },
			transition: { duration: 0.7 }
		};

		type TimelineItem = { year: string; title: string; description: string };
		type AboutJson = {
			bio: string;
			email: string;
			phone: string;
			location: string;
			timeline?: TimelineItem[];
			careerGoals?: string[];
		};
		const data = aboutData as unknown as AboutJson;

	return (
		<section id="about" className="py-20 bg-white dark:bg-gray-900" ref={ref}>
			<div className="container mx-auto px-4">
				<motion.div
					initial={fadeInUp.initial}
					animate={fadeInUp.animate}
					transition={fadeInUp.transition}
					className="text-center mb-10"
				>
					<h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">About Me</h2>
					<div className="w-24 h-1 bg-gradient-to-r from-indigo-600 to-cyan-600 mx-auto rounded-full" />
				</motion.div>

				<div className="max-w-6xl mx-auto">
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ delay: 0.2, duration: 0.6 }}
						className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-8 md:p-12 shadow-lg relative z-10"
					>
									<p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed mb-8">
										{data.bio}
									</p>

						<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
							<motion.div
								initial={{ opacity: 0, scale: 0.95 }}
								animate={{ opacity: 1, scale: 1 }}
								transition={{ delay: 0.3 }}
								className="flex items-center gap-3 p-4 bg-white dark:bg-gray-700 rounded-lg shadow"
							>
								<Mail className="w-6 h-6 text-indigo-600 dark:text-indigo-400 flex-shrink-0" />
								<div>
									<p className="text-sm text-gray-500 dark:text-gray-400">Email</p>
														<a
															href={`mailto:${data.email}`}
															className="text-gray-900 dark:text-white hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors text-sm break-all"
														>
															{data.email}
														</a>
								</div>
							</motion.div>

							<motion.div
								initial={{ opacity: 0, scale: 0.95 }}
								animate={{ opacity: 1, scale: 1 }}
								transition={{ delay: 0.4 }}
								className="flex items-center gap-3 p-4 bg-white dark:bg-gray-700 rounded-lg shadow"
							>
								<Phone className="w-6 h-6 text-indigo-600 dark:text-indigo-400 flex-shrink-0" />
								<div>
									<p className="text-sm text-gray-500 dark:text-gray-400">Phone</p>
														<a
															href={`tel:${data.phone}`}
															className="text-gray-900 dark:text-white hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
														>
															{data.phone}
														</a>
								</div>
							</motion.div>

							<motion.div
								initial={{ opacity: 0, scale: 0.95 }}
								animate={{ opacity: 1, scale: 1 }}
								transition={{ delay: 0.5 }}
								className="flex items-center gap-3 p-4 bg-white dark:bg-gray-700 rounded-lg shadow"
							>
								<MapPin className="w-6 h-6 text-indigo-600 dark:text-indigo-400 flex-shrink-0" />
								<div>
									<p className="text-sm text-gray-500 dark:text-gray-400">Location</p>
									  <p className="text-gray-900 dark:text-white">{data.location}</p>
								</div>
							</motion.div>
						</div>
					</motion.div>

					{/* Journey / Timeline */}
					  {data.timeline && (
						<motion.div
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ delay: 0.9, duration: 0.7 }}
							className="mt-12"
						>
							<h3 className="text-3xl font-bold text-center mb-8">My <span className="text-gradient">Journey</span></h3>

							<div className="space-y-8">
								{data.timeline!.map((item: TimelineItem, index: number) => {
									const mdDirection = index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse';
									return (
										<motion.div
											key={index}
											initial={{ opacity: 0.4, x: index % 2 === 0 ? -40 : 40 }}
											animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0.4, x: index % 2 === 0 ? -40 : 40 }}
											transition={{ duration: 0.7, delay: 1 + index * 0.15 }}
											className={`flex flex-col ${mdDirection} items-start gap-6 md:gap-6`}
										>
											<div className="flex-shrink-0 w-16 h-16 md:w-20 md:h-20 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-full flex items-center justify-center shadow-lg text-white font-bold text-lg mx-auto md:mx-0">
												{item.year}
											</div>

											<div className="flex-1 p-4 bg-gray-50 dark:bg-gray-800 rounded-xl shadow-md text-center md:text-left">
												<h4 className="text-xl font-semibold text-gray-900 dark:text-white">{item.title}</h4>
												<p className="text-gray-600 dark:text-gray-300 mt-2">{item.description}</p>
											</div>
										</motion.div>
									);
								})}
							</div>
						</motion.div>
					)}

					{/* Career Goals */}
					{data.careerGoals && (
						<motion.div
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ delay: 1.7, duration: 0.7 }}
							className="mt-12"
						>
							<h3 className="text-3xl font-bold text-center mb-8">Career <span className="text-gradient">Goals</span> 🎯</h3>

							<div className="grid md:grid-cols-3 gap-6">
								{data.careerGoals!.map((goal: string, i: number) => {
									const base = 'p-6 rounded-xl shadow-lg border-2 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700';
									const highlight = i === 0 ? 'ring-2 ring-indigo-100 dark:ring-indigo-900' : '';
									return (
										<motion.div
											key={i}
											initial={{ opacity: 0.4, y: 30 }}
											animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0.4, y: 30 }}
											transition={{ delay: 1.9 + i * 0.15, duration: 0.6 }}
											whileHover={{ y: -8, scale: 1.02 }}
											className={`${base} ${highlight}`}
										>
											<div className="flex items-start gap-3">
												<span className="text-3xl">{i === 0 ? '🎯' : i === 1 ? '🚀' : '🤖'}</span>
												<div>
													{i === 0 && <span className="inline-block px-2 py-1 bg-indigo-600 text-white text-xs font-bold rounded-full mb-2">PRIMARY GOAL</span>}
													<p className="text-gray-700 dark:text-gray-300 leading-relaxed">{goal}</p>
												</div>
											</div>
										</motion.div>
									);
								})}
							</div>
						</motion.div>
					)}
				</div>
			</div>
		</section>
	);
};

export default About;

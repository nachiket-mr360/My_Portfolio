import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { FiX, FiExternalLink } from 'react-icons/fi';
import achievementsData from '../data/achievements.json';

const Achievements = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, margin: "-100px", amount: 0.3 });
  const [selectedCert, setSelectedCert] = useState(null);

  return (
    <section id="achievements" className="py-12 md:py-20 lg:py-24 bg-gray-50 dark:bg-gray-800" ref={ref}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="max-w-7xl mx-auto"
        >
          {/* Section Title */}
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-center mb-4 md:mb-6">
            Achievements & <span className="text-gradient">Certificates</span>
          </h2>
          <p className="text-center text-gray-600 dark:text-gray-400 mb-8 md:mb-12 text-base sm:text-lg px-4">
            My learning journey and accomplishments
          </p>

          {/* Certificates Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
            {achievementsData.map((cert, index) => (
              <motion.div
                key={cert.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
                onClick={() => setSelectedCert(cert)}
                className="cursor-pointer group"
              >
                <div className="bg-white dark:bg-gray-900 rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all">
                  {/* Certificate Icon/Image */}
                  <div className="h-40 bg-gradient-to-br from-primary-500 via-purple-500 to-pink-500 flex items-center justify-center">
                    <span className="text-6xl">🏆</span>
                  </div>

                  {/* Content */}
                  <div className="p-4 space-y-2">
                    <h3 className="font-bold text-gray-900 dark:text-white line-clamp-2 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                      {cert.title}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {cert.issuer}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-500">
                      {cert.date}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Modal */}
      {selectedCert && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setSelectedCert(null)}
          className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-6"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-white dark:bg-gray-800 rounded-2xl max-w-2xl w-full p-8 relative"
          >
            {/* Close Button */}
            <button
              onClick={() => setSelectedCert(null)}
              className="absolute top-4 right-4 p-2 rounded-full bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
            >
              <FiX className="w-6 h-6" />
            </button>

            {/* Certificate Preview */}
            <div className="mb-6 h-64 bg-gradient-to-br from-primary-500 via-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
              <span className="text-8xl">🏆</span>
            </div>

            {/* Details */}
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              {selectedCert.title}
            </h3>

            <div className="space-y-3 mb-6">
              <p className="text-gray-600 dark:text-gray-300">
                <span className="font-semibold">Issuer:</span> {selectedCert.issuer}
              </p>
              <p className="text-gray-600 dark:text-gray-300">
                <span className="font-semibold">Date:</span> {selectedCert.date}
              </p>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                {selectedCert.description}
              </p>
            </div>

            {/* View Credential Button */}
            <a
              href={selectedCert.credentialUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-primary-600 text-white rounded-lg font-semibold hover:bg-primary-700 transition-colors"
            >
              <FiExternalLink />
              View Credential
            </a>
          </motion.div>
        </motion.div>
      )}
    </section>
  );
};

export default Achievements;

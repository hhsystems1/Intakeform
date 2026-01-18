import React, { useState } from 'react'
import { SketchPicker } from 'react-color'
import emailjs from '@emailjs/browser'

const IntakeForm = () => {
  const [formData, setFormData] = useState({
    companyName: '',
    contactName: '',
    email: '',
    phone: '',
    websiteGoal: '',
    targetAudience: '',
    features: [],
    timeline: '',
    budget: '',
    existingWebsite: '',
    competitors: '',
    additionalInfo: '',
  })

  const [primaryColor, setPrimaryColor] = useState('#667eea')
  const [secondaryColor, setSecondaryColor] = useState('#764ba2')
  const [showPrimaryPicker, setShowPrimaryPicker] = useState(false)
  const [showSecondaryPicker, setShowSecondaryPicker] = useState(false)

  const [uploadedImages, setUploadedImages] = useState([])
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState(null)

  const featureOptions = [
    'E-commerce',
    'Blog',
    'Contact Form',
    'Newsletter Signup',
    'Photo Gallery',
    'Video Content',
    'Social Media Integration',
    'Search Functionality',
    'User Accounts/Login',
    'Booking System',
    'Live Chat',
    'Multi-language Support',
  ]

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleFeatureToggle = (feature) => {
    setFormData(prev => ({
      ...prev,
      features: prev.features.includes(feature)
        ? prev.features.filter(f => f !== feature)
        : [...prev.features, feature]
    }))
  }

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files)
    const newImages = files.map(file => ({
      file,
      preview: URL.createObjectURL(file),
      name: file.name
    }))
    setUploadedImages(prev => [...prev, ...newImages])
  }

  const removeImage = (index) => {
    setUploadedImages(prev => {
      const updated = [...prev]
      URL.revokeObjectURL(updated[index].preview)
      updated.splice(index, 1)
      return updated
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus(null)

    try {
      // For EmailJS integration, you'll need to:
      // 1. Sign up at https://www.emailjs.com/
      // 2. Create an email service
      // 3. Create an email template
      // 4. Replace these IDs with your actual IDs from EmailJS dashboard

      const templateParams = {
        company_name: formData.companyName,
        contact_name: formData.contactName,
        email: formData.email,
        phone: formData.phone,
        website_goal: formData.websiteGoal,
        target_audience: formData.targetAudience,
        features: formData.features.join(', '),
        timeline: formData.timeline,
        budget: formData.budget,
        existing_website: formData.existingWebsite,
        competitors: formData.competitors,
        additional_info: formData.additionalInfo,
        primary_color: primaryColor,
        secondary_color: secondaryColor,
        image_count: uploadedImages.length,
      }

      // Uncomment and configure when you have EmailJS credentials:
      
      await emailjs.send(
        SERVICE_ID,
        TEMPLATE_ID,
        templateParams,
        {
          publicKey: PUBLIC_KEY,
        }
      )
      

      // Also log the data for debugging
      console.log('Form submission data:', {
        ...templateParams,
        images: uploadedImages.map(img => img.name)
      })

      setSubmitStatus({
        type: 'success',
        message: 'Form submitted successfully! Check your email.'
      })

      // Reset form
      setFormData({
        companyName: '',
        contactName: '',
        email: '',
        phone: '',
        websiteGoal: '',
        targetAudience: '',
        features: [],
        timeline: '',
        budget: '',
        existingWebsite: '',
        competitors: '',
        additionalInfo: '',
      })
      setPrimaryColor('#667eea')
      setSecondaryColor('#764ba2')
      setUploadedImages([])

    } catch (error) {
      console.error('Submission error:', error)
      setSubmitStatus({
        type: 'error',
        message: 'Failed to submit form. Please try again.'
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="bg-white rounded-2xl shadow-2xl p-8">
      <form onSubmit={handleSubmit} className="space-y-8">

        {/* Company Information Section */}
        <section>
          <h2 className="text-2xl font-bold text-gray-800 mb-4 border-b-2 border-purple-500 pb-2">
            Company Information
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Company Name *
              </label>
              <input
                type="text"
                name="companyName"
                value={formData.companyName}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition"
                placeholder="Your Company Name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Contact Name *
              </label>
              <input
                type="text"
                name="contactName"
                value={formData.contactName}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition"
                placeholder="Your Name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email Address *
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition"
                placeholder="email@example.com"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Phone Number
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition"
                placeholder="(123) 456-7890"
              />
            </div>
          </div>
        </section>

        {/* Project Details Section */}
        <section>
          <h2 className="text-2xl font-bold text-gray-800 mb-4 border-b-2 border-purple-500 pb-2">
            Project Details
          </h2>
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                What is the main goal of your website? *
              </label>
              <textarea
                name="websiteGoal"
                value={formData.websiteGoal}
                onChange={handleInputChange}
                required
                rows="3"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition"
                placeholder="e.g., Sell products online, showcase portfolio, generate leads, provide information..."
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Who is your target audience?
              </label>
              <textarea
                name="targetAudience"
                value={formData.targetAudience}
                onChange={handleInputChange}
                rows="3"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition"
                placeholder="Describe your ideal customers or users..."
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Existing Website URL (if any)
              </label>
              <input
                type="url"
                name="existingWebsite"
                value={formData.existingWebsite}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition"
                placeholder="https://yourwebsite.com"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Competitor Websites (for reference)
              </label>
              <textarea
                name="competitors"
                value={formData.competitors}
                onChange={handleInputChange}
                rows="2"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition"
                placeholder="List any competitor websites you like or want to reference..."
              />
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section>
          <h2 className="text-2xl font-bold text-gray-800 mb-4 border-b-2 border-purple-500 pb-2">
            Desired Features
          </h2>
          <div className="grid md:grid-cols-3 gap-3">
            {featureOptions.map(feature => (
              <label
                key={feature}
                className="flex items-center space-x-2 p-3 border border-gray-200 rounded-lg cursor-pointer hover:bg-purple-50 transition"
              >
                <input
                  type="checkbox"
                  checked={formData.features.includes(feature)}
                  onChange={() => handleFeatureToggle(feature)}
                  className="w-5 h-5 text-purple-600 rounded focus:ring-purple-500"
                />
                <span className="text-sm text-gray-700">{feature}</span>
              </label>
            ))}
          </div>
        </section>

        {/* Color Scheme Section */}
        <section>
          <h2 className="text-2xl font-bold text-gray-800 mb-4 border-b-2 border-purple-500 pb-2">
            Brand Colors
          </h2>
          <p className="text-sm text-gray-600 mb-4">
            Choose your primary and secondary brand colors for the website
          </p>
          <div className="grid md:grid-cols-2 gap-6">
            {/* Primary Color */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Primary Color
              </label>
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setShowPrimaryPicker(!showPrimaryPicker)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg flex items-center space-x-3 hover:border-purple-500 transition"
                >
                  <div
                    className="w-8 h-8 rounded border-2 border-gray-300"
                    style={{ backgroundColor: primaryColor }}
                  />
                  <span className="font-mono text-sm">{primaryColor}</span>
                </button>
                {showPrimaryPicker && (
                  <div className="absolute z-10 mt-2">
                    <div
                      className="fixed inset-0"
                      onClick={() => setShowPrimaryPicker(false)}
                    />
                    <SketchPicker
                      color={primaryColor}
                      onChange={(color) => setPrimaryColor(color.hex)}
                    />
                  </div>
                )}
              </div>
            </div>

            {/* Secondary Color */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Secondary Color
              </label>
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setShowSecondaryPicker(!showSecondaryPicker)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg flex items-center space-x-3 hover:border-purple-500 transition"
                >
                  <div
                    className="w-8 h-8 rounded border-2 border-gray-300"
                    style={{ backgroundColor: secondaryColor }}
                  />
                  <span className="font-mono text-sm">{secondaryColor}</span>
                </button>
                {showSecondaryPicker && (
                  <div className="absolute z-10 mt-2">
                    <div
                      className="fixed inset-0"
                      onClick={() => setShowSecondaryPicker(false)}
                    />
                    <SketchPicker
                      color={secondaryColor}
                      onChange={(color) => setSecondaryColor(color.hex)}
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Image Upload Section */}
        <section>
          <h2 className="text-2xl font-bold text-gray-800 mb-4 border-b-2 border-purple-500 pb-2">
            Reference Images
          </h2>
          <p className="text-sm text-gray-600 mb-4">
            Upload logos, inspiration images, or any visual references
          </p>
          <div className="space-y-4">
            <label className="block">
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-purple-500 transition cursor-pointer">
                <svg
                  className="mx-auto h-12 w-12 text-gray-400"
                  stroke="currentColor"
                  fill="none"
                  viewBox="0 0 48 48"
                >
                  <path
                    d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <p className="mt-2 text-sm text-gray-600">
                  Click to upload or drag and drop
                </p>
                <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
              </div>
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />
            </label>

            {uploadedImages.length > 0 && (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {uploadedImages.map((image, index) => (
                  <div key={index} className="relative group">
                    <img
                      src={image.preview}
                      alt={image.name}
                      className="w-full h-32 object-cover rounded-lg border-2 border-gray-200"
                    />
                    <button
                      type="button"
                      onClick={() => removeImage(index)}
                      className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                    <p className="text-xs text-gray-600 mt-1 truncate">{image.name}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* Timeline and Budget Section */}
        <section>
          <h2 className="text-2xl font-bold text-gray-800 mb-4 border-b-2 border-purple-500 pb-2">
            Timeline & Budget
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Desired Timeline
              </label>
              <select
                name="timeline"
                value={formData.timeline}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition"
              >
                <option value="">Select timeline</option>
                <option value="asap">ASAP</option>
                <option value="1-2-months">1-2 months</option>
                <option value="3-6-months">3-6 months</option>
                <option value="flexible">Flexible</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Budget Range
              </label>
              <select
                name="budget"
                value={formData.budget}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition"
              >
                <option value="">Select budget</option>
                <option value="500">$500</option>
                <option value="1k-2k">$1,000 - $2,000</option>
                <option value="25k-45k">$2,500 - $4,500</option>
                <option value="5k-plus">$5,000+</option>
                <option value="not-sure">Not sure yet</option>
              </select>
            </div>
          </div>
        </section>

        {/* Additional Information Section */}
        <section>
          <h2 className="text-2xl font-bold text-gray-800 mb-4 border-b-2 border-purple-500 pb-2">
            Additional Information
          </h2>
          <textarea
            name="additionalInfo"
            value={formData.additionalInfo}
            onChange={handleInputChange}
            rows="4"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition"
            placeholder="Any other details, requirements, or questions you'd like to share..."
          />
        </section>

        {/* Submit Button */}
        <div className="pt-6">
          {submitStatus && (
            <div className={`mb-4 p-4 rounded-lg ${
              submitStatus.type === 'success'
                ? 'bg-green-100 text-green-800'
                : 'bg-red-100 text-red-800'
            }`}>
              {submitStatus.message}
            </div>
          )}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-bold py-4 px-6 rounded-lg hover:from-purple-700 hover:to-indigo-700 transition transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none shadow-lg"
          >
            {isSubmitting ? 'Submitting...' : 'Submit Intake Form'}
          </button>
        </div>
      </form>
    </div>
  )
}

export default IntakeForm

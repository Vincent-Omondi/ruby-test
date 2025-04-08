Rails.application.config.after_initialize do
  if Rails.env.production?
    Rails.logger.info "Asset manifest contents: #{Rails.application.assets_manifest.assets.keys}"
    
    # Check if critical assets exist
    %w[application.css application.js].each do |asset|
      if Rails.application.assets_manifest.assets[asset]
        Rails.logger.info "✅ Asset found: #{asset}"
      else
        Rails.logger.warn "⚠️ Asset missing: #{asset}"
      end
    end
  end
end 

Pod::Spec.new do |s|
  s.name         = "RNTapsell"
  s.version      = "3.0.6"
  s.summary      = "RNTapsell"
  s.description  = <<-DESC
                  RNTapsell
                   DESC
  s.homepage     = ""
  s.license      = "MIT"
  # s.license      = { :type => "MIT", :file => "FILE_LICENSE" }
  s.author             = { "author" => "author@domain.cn" }
  s.platform     = :ios, "7.0"
  s.source       = { :git => "https://github.com/author/RNTapsell.git", :tag => "master" }
  s.source_files  = "RNTapsell/**/*.{h,m}"
  s.requires_arc = true


  s.dependency "React"
  s.dependency "TapsellSDKv3"

end

  
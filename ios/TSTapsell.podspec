Pod::Spec.new do |s|
  s.name             = 'TSTapsell'
  s.version          = '0.1.0'
  s.summary          = 'Tapsell Advertising plugin for iOS react native'

  s.homepage         = 'https://tapsell.ir'
  s.license          = { :type => 'ISC', :file => 'LICENSE' }
  s.author           = { 'Ahmadreza Saboor' => 'ahmadreza.saboor2012@gmail.com' }

  s.ios.deployment_target = '8.0'
  s.source_files = 'TSTapsell/*’
end

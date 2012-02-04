class UrlController < ApplicationController
  def index
    @urls = Url.all(:order => "created_at DESC")
  end
  
  def sync
    if not params.has_key?(:urls)
      render :json => {:status => 1, :message => 'Invalid Parameter'}
      return
    end
      
    @urls = params[:urls]
    if not @urls.nil?
      @urls.each do |url|
        @url = Url.new(:url => url)
        begin
          @url.save!
        rescue
        end
      end
    end
    
    render :json => {:status => 0, :message => 'OK'}
  end
end
